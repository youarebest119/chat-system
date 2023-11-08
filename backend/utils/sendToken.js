exports.sendToken = (user, res) => {
    let token = user.getJWTToken();
    res.status(200).cookie("token", token, {
        expires: new Date(
            Date.now() + Number(process.env.COOKIE_EXPIRE) * 30,
        ),
        httpOnly: true,
    }).json({
        success: true,
        token,
        user,
    })
}