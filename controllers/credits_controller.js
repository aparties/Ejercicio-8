// GET /author
exports.author = function(req, res) {
   res.render('credits/author', {nombre: 'Armando Fiestas', errors: []});	
};
