const followermodel = require("../models/follower.model");
const usermodel = require("../models/user.model")
async function followercontrolerhandler(req, res) {
    const followerusername = req.user.username;
    const followeeusername = req.params.username;
    if (followeeusername === followerusername) {
        return res.status(400).json({
            message: "You cannot Follow Yourshelf "
        })
    }
    const followeexists = await usermodel.findOne({
        username: followeeusername
    })
    if (!followeexists) {
        return res.status(404).json({
            message: `${followeeusername} does not exist`
        })
    }
    const alreadyfollowing = await followermodel.findOne({
        follower: followerusername,
        followee: followeeusername
    })
    if (alreadyfollowing) {
        return res.status(200).json({
            message: `You are already following ${followeeusername}`
        })
    }
    const follow = await followermodel.create({
        follower: followerusername,
        followee: followeeusername
    })
    res.status(201).json({
        message: `You are successfully following ${followeeusername}`,
        follow
    })
}

async function followerdeletehandler(req, res) {
    const followerusername = req.user.username;
    const followeeusername = req.params.username;

    const followrecord = await followermodel.findOne({
        follower: followerusername,
        followee: followeeusername
    })

    if (!followrecord) {
        return res.status(404).json({
            message: `You dont follow ${followeeusername}`
        })
    }

    await followermodel.findByIdAndDelete(followrecord._id);

    res.status(201).json({
        message: `You are unfollowing ${followeeusername} successfully`
    })
}

async function followerpendingrecordscontrolerhandler(req, res) {
    const username = req.user.username;
    const pendingrequests = await followermodel.find({
        followee: username,
        status: "Pending"
    })

    const records = await Promise.all(pendingrequests.map(async (req) => {
        const user = await usermodel.findOne({ username: req.follower }, "username profileimage");
        return { ...req.toObject(), follower_info: user };
    }));

    res.status(200).json({
        message: records.length ? "Pending requests" : "No pending requests",
        records
    })
}

async function followeracceptcontrolerhandler(req, res) {
    const username = req.user.username;
    const followreq = req.params.followid;

    const requestexists = await followermodel.findOne({
        _id: followreq,
        followee: username
    })
    if (!requestexists) {
        return res.status(404).json({
            message: "Request to follow not found"
        })
    }
    const updatedrequest = await followermodel.findByIdAndUpdate(requestexists._id, {
        status: "Following"
    })
    res.status(201).json({
        message: "Following request accepted",
        updatedrequest
    })
}

async function followerrejectcontrolerhandler(req, res) {
    const username = req.user.username;
    const followreq = req.params.followid;

    const requestexists = await followermodel.findOne({
        _id: followreq,
        followee: username
    })
    if (!requestexists) {
        return res.status(404).json({
            message: "Request to follow not found"
        })
    }
    const updatedrequest = await followermodel.findByIdAndUpdate(requestexists._id, {
        status: "Rejected"
    })
    res.status(201).json({
        message: "Following request rejected",
        updatedrequest
    })
}

async function followeroutgoingrecordscontrolerhandler(req, res) {
    const username = req.user.username;
    const outgoingrequests = await followermodel.find({
        follower: username
    })

    const records = await Promise.all(outgoingrequests.map(async (req) => {
        const user = await usermodel.findOne({ username: req.followee }, "username profileimage");
        return { ...req.toObject(), followee_info: user };
    }));

    res.status(200).json({
        message: records.length ? "Outgoing records" : "No records found",
        records
    })
}

module.exports = {
    followercontrolerhandler,
    followerdeletehandler,
    followerpendingrecordscontrolerhandler,
    followeracceptcontrolerhandler,
    followerrejectcontrolerhandler,
    followeroutgoingrecordscontrolerhandler
}