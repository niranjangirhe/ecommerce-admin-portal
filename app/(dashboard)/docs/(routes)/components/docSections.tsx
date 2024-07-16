import BaseUrlDoc from "./baseurl";
import BillboardAPIDoc from "./billboards";
import CategoryAPIDoc from "./categories";
import SizeAPIDoc from "./sizes";
import ColorAPIDoc from "./colors";
import ProductAPIDoc from "./products";
import OrderAPIDoc from "./orders";
import GettingStartedDoc from "./getting-started";
import IntroductionDoc from "./introduction";

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
    id: "categories",
    title: "Categories",
    content: <CategoryAPIDoc />,
  },
  {
    id: "Sizes",
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
    title: "Orders",
    content: <OrderAPIDoc />,
  },
];
