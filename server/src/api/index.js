

const { Router } = require("express");
const ProductRoute = require("./routes/product.route.js");
const BannerRouter = require("./routes/banner.route.js");
const ReviewRoute = require("./routes/review.route.js");
const CartRoute = require("./routes/cart.route.js");
const rootRouter = Router();
rootRouter.use("/banners", BannerRouter);
rootRouter.use("/products", ProductRoute);
rootRouter.use("/reviews", ReviewRoute);
rootRouter.use("/carts", CartRoute);

module.exports = rootRouter;
