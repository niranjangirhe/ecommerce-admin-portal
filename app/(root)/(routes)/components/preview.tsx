import PreviewImage from "@/assets/preview.png";
import Image from "next/image";

const Preview = () => {
  return (
    <div className="h-screen pt-10 md:pt-20 px-14 bg-black dark:bg-white text-blue-200 dark:text-slate-900 flex justify-center">
      <div className="max-w-7xl w-full flex flex-col lg:flex-row">
        <div>
          <h5 className="text-md ">BUILD AN ONLINE STORE</h5>
          <h3 className="text-4xl font-bold">Your store, your way</h3>
        </div>
        <div className="flex-1 mt-10 mb-10 lg:mb-20 lg:ml-20 p-10 content-center rounded-lg bg-gradient-to-br from-purple-200  via-pink-300 to-red-800 dark:from-orange-800 dark:via-yellow-500 dark:to-green-200">
          <div
            style={{
              perspective: "500px",
            }}
          >
            <div
              style={{
                transform: "rotateX(15deg) rotateY(8deg)",
                transformOrigin: "center center",
                maxWidth: "100%",
              }}
              className="rounded-lg shadow-lg"
            >
              <Image
                src={PreviewImage}
                alt="Preview"
                className="w-full h-full object-contain"
                style={{ borderRadius: "inherit" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
