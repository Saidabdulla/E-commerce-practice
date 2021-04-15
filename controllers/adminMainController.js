exports.main = (req, res) => {
    res.status(200).render('./admin/admin-main', { 
        title: 'Admin | Main',
        layout: './admin/admin-layout' 
    });
}


