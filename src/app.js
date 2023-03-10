import express from 'express';
import cors from 'cors';
const app = express();

app.use(cors());
app.use(express.json());

const registration = [];
const tweets = [];
let useravatar = "";
let user = {};

app.post("/sign-up", (req, res) => {
    const { username, avatar } = req.body;
    user = { username, avatar };
    if (!user.username || !avatar || typeof user.username !== "string" || typeof avatar !== "string") {
        return res.status(400).send("Todos os campos são obrigatórios!")
    };

    useravatar = avatar;
    registration.push(user);
    return res.status(201).send("CREATED")
});

app.post("/tweets", (req, res) => {
    const { username, tweet } = req.body;

    const use = req.headers.user;

    const message =
    {
        username: !use ? username : use,
        avatar: useravatar,
        tweet
    };
    if (!tweet || typeof tweet !== "string") {
        return res.status(400).send("Todos os campos são obrigatórios!")
    };
    if (!username && !use) {
        return res.status(401).send("UNAUTHORIZED")
    };
    tweets.unshift(message);
    return res.status(201).send("CREATED")
});

app.get("/tweets", (req, res) => {
    const page = req.query.page

    if (Number(page) <= 0) {
        return res.status(400).send("UNAUTHORIZED")
    }

    let tenTweets = ''

    if (!page) {
        tenTweets = tweets.slice(0, 10)
    } else if (1 == Number(page)) {
        tenTweets = tweets.slice(0, 10)
    } else if (2 == Number(page)) {
        tenTweets = tweets.slice(10, 20)
    } else if (3 == Number(page)) {
        tenTweets = tweets.slice(20, 30)
    };

    return res.send(tenTweets)

});

app.get("/tweets/:name", (req, res) => {
    const name = req.params.name;
    const tweetUser = tweets.filter(item => item.username === name);
    return res.send(tweetUser)
});

const PORT = 5000;

app.listen(PORT, () => { console.log(`SERVER RUNNING IN PORT: ${PORT}`) });