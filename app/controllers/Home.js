const Home = {};

Home.get = (req, res) => {
    res.send({
        title: 'Bienvenue sur votre dashboard'
    }).status(200)
}
module.exports = Home;