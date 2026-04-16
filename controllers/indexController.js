function getAllMessages(req, res) {
	res.render("index", {
		title: "Home",
		formData: null,
		errors: [],
		openRegister: false,
	});
}

module.exports = { getAllMessages };
