exports.logout = function logout (req, res) {
    res.cookie('authToken', '', {
        maxAge: 0,
        sameSite: 'none',
        secure: true,
        httpOnly: true
    });
    res.status(200).json({message: 'Logout successful'});
    return;
}