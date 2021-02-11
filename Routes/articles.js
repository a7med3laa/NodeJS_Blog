const express = require("express");
const Article = require('../models/article');
const router = express.Router();

router.get("/new", function (req, res) {

    res.render("articles/new", {
        article: new Article()
    });
});


router.get("/edit/:id", async function (req, res) {
    const article = await Article.findById(req.params.id);

    res.render("articles/edit", {
        article: article
    });
});

router.get("/:id", async function (req, res) {
    const article = await Article.findById(req.params.id);
    if (article === null) {
        res.redirect("/");
    } else {
        res.render('articles/show', {
            article: article
        });
    }

})

router.post("/", async function (req, res) {
    let article = new Article({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown

    });
    try {
        article = await article.save();
        res.redirect(`/articles/${article.id}`);
    } catch (error) {
        res.render("articles/new", {
            article: article
        });
    }
});

router.delete('/:id', async function (req, res) {
    await Article.findByIdAndDelete(req.params.id);
    res.redirect("/");
});

router.put('/:id', async function (req, res) {
    console.log(req.body.markdown);
    await Article.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        description: req.body.description,
        senitizedHtml: req.body.markdown
    }, function (err, docs) {
        if (err) {
            console.log(err)
        } else {
            res.redirect(`/articles/${req.params.id}`);
        }
    });

});


module.exports = router;