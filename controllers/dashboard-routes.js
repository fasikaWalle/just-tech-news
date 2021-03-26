const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment } = require("../models");
const withAuth = require("../__test__/utilis/auth");

router.get("/", withAuth, (req, res) => {
  // if(!req.session.loggedIn){
  //     res.redirect('/');
  //     return;
  //   }

  Post.findAll({
    where: {
      user_id: req.session.user_id,
    },
    attributes: [
      "id",
      "post_url",
      "title",
      "createdAt",
      [
        sequelize.literal(
          "(SELECT COUNT(*) FROM vote WHERE post.id=vote.post_id)"
        ),
        "vote_count",
      ],
    ],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "createdAt"],
        include: [
          {
            model: User,
            attributes: ["username"],
          },
        ],
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbUserData) => {
      const posts = dbUserData.map((post) => post.get({ plain: true }));
      console.log(posts);
      res.render("dashboard", { posts, loggedIn: true });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get("/edit/:id", withAuth, (req, res) => {
  Post.findByPk(req.params.id, {
    attributes: [
      "id",
      "post_url",
      "title",
      "createdAt",
      [
        sequelize.literal(
          "(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)"
        ),
        "vote_count",
      ],
    ],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "createdAt"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPostData) => {
      if (dbPostData) {
        const post = dbPostData.get({ plain: true });

        res.render("edit-post", {
          post,
          loggedIn: true,
        });
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});
module.exports = router;
