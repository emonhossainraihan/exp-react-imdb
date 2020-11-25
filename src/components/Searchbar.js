import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef, useEffect } from "react";
import { withRouter } from "react-router-dom";

function Searchbar({ history }) {
  const inputRef = useRef();
  const formRef = useRef();
  const [focus, setFocus] = useState(false);
  const [input, setInput] = useState("");

  useEffect(() => {
    // add the event listener to the document when component mounts
    document.addEventListener("mousedown", handleClick);

    // clean up the component when unmounted
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const handleClick = (e) => {
    if (formRef.current.contains(e.target)) return;
    setFocus(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.length === 0) return;
    inputRef.current.blur();
    setFocus(false);
    setInput("");
    history.push(`${process.env.PUBLIC_URL}/search/${input}`);
  };
  console.log("searchbar");
  return (
    <form
      ref={formRef}
      onClick={() => {
        setFocus(true);
        inputRef.current.focus();
      }}
      onSubmit={handleSubmit}
      className={`transition-all ease-in ${
        focus ? "w-80 sm:w-96 cursor-auto" : "w-8 cursor-pointer"
      } relative text-gray-100`}
    >
      <input
        ref={inputRef}
        type="text"
        placeholder="Search for a movie..."
        value={input}
        className={`text-xl lg:text-sm transition-all ease-in w-full pl-10 lg:pl-8 py-1.5 outline-none rounded-full bg-gray-600 text-gray-50 placeholder-gray-100 border-none ${
          focus ? "cursor-auto pr-4" : "cursor-pointer"
        }`}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        type="submit"
        className={`absolute inset-2.5 lg:left-2 flex justify-center items-center text-lg ${
          focus
            ? "pointer-events-auto cursor-pointer"
            : "pointer-events-none cursor-none"
        }`}
      >
        <FontAwesomeIcon icon={faSearch} className="text-md lg:text-sm" />
      </button>
    </form>
  );
}

export default withRouter(Searchbar);
