import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactPlayer from "react-player";
import Loader from "./loader";
import NotFound from "./notFound";
//using context as a template
import { useResultsContext } from "../contexts/resultContextProvider";

//not using the search cause here we are just showing the results
const Results = () => {
  const { getResults, results, searchTerm, isLoading } = useResultsContext();
  const location = useLocation();

  useEffect(() => {
    if (searchTerm !== "") {
      if (location.pathname === "/videos") {
        getResults(`/search/q=${searchTerm}vidoes`);
      } else if (location.pathname === "/images") {
        getResults(`/image/q=${searchTerm}`);
      } else {
        getResults(`${location.pathname}/q=${searchTerm}`);
      }
    }
  }, [searchTerm, location.pathname]);

  if (isLoading) return <Loader />;

  switch (location.pathname) {
    case "/search":
      return (
        <div className="sm:px-56  space-y-6">
          {results?.results?.length > 0 ? (
            results?.results?.map(({ link, title, description }, index) => (
              <div key={index} className="md:w-2/5 w-full mb-2">
                <a href={link} target="_blank" rel="noreferrer">
                  <p className="text-sm">
                    {link.length > 30 ? link.substring(0, 30) : link}
                  </p>
                  <p className="text-xl hover:underline dark:text-blue-300 text-blue-700  ">
                    {title}
                  </p>
                  <p className="text-gray-500 mt-1">{description}</p>
                </a>
              </div>
            ))
          ) : (
            <NotFound title="Result" />
          )}
        </div>
      );
    case "/images":
      return (
        <div className="flex flex-wrap justify-center items-center">
          {results?.image_results?.length > 0 ? (
            results?.image_results?.map(
              ({ image, link: { href, title } }, index) => (
                <a
                  href={href}
                  target="_blank"
                  key={index}
                  rel="noreferrer"
                  className="sm:p-3 p-5"
                >
                  <img src={image?.src} alt={title} loading="lazy" />
                  <p className="sm:w-36 w-36 break-words text-sm mt-2">
                    {title}
                  </p>
                </a>
              )
            )
          ) : (
            <NotFound title="Image" />
          )}
        </div>
      );
    case "/news":
      return (
        <div className="sm:px-56 space-y-6">
          {results?.entries?.length > 0 ? (
            results?.entries?.map(
              ({ id, links, source, title, published_parsed }) => (
                <div key={id} className="md:w-2/5 w-full ">
                  <a
                    href={links?.[0].href}
                    target="_blank"
                    rel="noreferrer "
                    className="hover:underline "
                  >
                    <p className="text-lg dark:text-blue-300 text-blue-700">
                      {title}
                    </p>
                  </a>
                  <div className="flex gap-4">
                    <a
                      href={source?.href}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:underline hover:text-blue-300"
                    >
                      {" "}
                      {source?.href}
                    </a>
                    <span className="text-gray-500 ">
                      {"   "}
                      {published_parsed[0] +
                        "/" +
                        published_parsed[1] +
                        "/" +
                        published_parsed[2]}
                    </span>
                  </div>
                </div>
              )
            )
          ) : (
            <NotFound title="News" />
          )}
        </div>
      );
    case "/videos":
      return (
        <div className="flex flex-wrap justify-around items-center">
          {results?.results?.length > 0 ? (
            results?.results?.map((video, index) => (
              <div
                key={index}
                className="pt-2 h-96 px-2 border border-gray-500 rounded-md m-5 w-96 cursor-pointer"
              >
                <ReactPlayer
                  url={video.additional_links?.[0].href}
                  controls
                  width="355px"
                  height="200px"
                />
                {/* <video height={200} width={355} controls>
                  <source src={video?.link} />
                </video> */}
                <p className="mt-3 text-gray-600 dark:text-gray-200 ">
                  {video?.description}
                </p>
              </div>
            ))
          ) : (
            <NotFound title="Videos" />
          )}
        </div>
      );
    default:
      return "Error...";
  }
};

export default Results;
