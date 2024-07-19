import BaseUrlDoc from "./baseurl";
import BillboardAPIDoc from "./billboards";
import CategoryAPIDoc from "./categories";
import SizeAPIDoc from "./sizes";
import ColorAPIDoc from "./colors";
import ProductAPIDoc from "./products";
import OrderAPIDoc from "./orders";
import GettingStartedDoc from "./getting-started";
import IntroductionDoc from "./introduction";
import StoreFrontEndDoc from "./store-frontend";
import CheckoutDoc from "./checkout";
import HomepageAPIDoc from "./homepage";

export const sections = [
  {
    id: "introduction",
    title: "Introduction to StoreOps API Documentation",
    content: <IntroductionDoc />,
  },
  {
    id: "getting-started",
    title: "Guide to Setup the Admin Portal Locally",
    content: <GettingStartedDoc />,
  },
  {
    id: "base-url",
    title: "Base URL",
    content: <BaseUrlDoc />,
  },
  {
    id: "billboards",
    title: "Billboards",
    content: <BillboardAPIDoc />,
  },
  {
    id: "homepage-billboard",
    title: "Homepage Billboard",
    content: <HomepageAPIDoc />,
  },
  {
    id: "categories",
    title: "Categories",
    content: <CategoryAPIDoc />,
  },
  {
    id: "sizes",
    title: "Sizes",
    content: <SizeAPIDoc />,
  },
  {
    id: "colors",
    title: "Colors",
    content: <ColorAPIDoc />,
  },
  {
    id: "products",
    title: "Products",
    content: <ProductAPIDoc />,
  },
  {
    id: "orders",
    title: "Track Orders",
    content: <OrderAPIDoc />,
  },
  {
    id: "checkout",
    title: "Checkout",
    content: <CheckoutDoc />,
  },
  {
    id: "store-front-end",
    title: "Store Front End setup guide",
    content: <StoreFrontEndDoc />,
  },
];
