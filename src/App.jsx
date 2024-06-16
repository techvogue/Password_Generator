import {
  useState,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [num, setNum] = useState(false);
  const [char, setChar] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);
  const passworGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const numStr = "0123456789";
    const charStr = "!@#$%^&*()_+";

    if (num) {
      str += numStr;
      pass += numStr.charAt(Math.floor(Math.random() * numStr.length));
    }

    if (char) {
      str += charStr;
      pass += charStr.charAt(Math.floor(Math.random() * charStr.length));
    }

    for (let i = pass.length; i < length; i++) {
      pass += str.charAt(Math.floor(Math.random() * str.length));
    }

    setPassword(
      pass
        .split("")
        .sort(() => Math.random() - 0.5)
        .join("")
    );
  }, [length, num, char]);
  useEffect(() => {
    passworGenerator();
  }, [length, num, char, passworGenerator]);

  const copyToClipboard = () => {
    passwordRef.current.select();
    passwordRef.current.setSelectionRange(0, 99999); // For mobile devices

    navigator.clipboard
      .writeText(password)
      .then(() => {
        alert("Password copied to clipboard!");
      })
      .catch((err) => {
        console.error("Could not copy text: ", err);
      });
  };

  return (
    <>
      <div className="bg-slate-700 max-w-screen-md p-5 h-2/4 my-20 rounded-md mx-auto">
        <div
          className="
        w-full  mx-auto shadow-md bg-black rounded-lg px-4 py-3  my-8 text-white text-4xl text-center"
        >
          Password Generator
        </div>

        <div className="w-full flex justify-center align-middle">
          <div className="w-10/12">
            <input
              ref={passwordRef}
              type="text"
              value={password}
              className="outline-none w-full  text-4xl py-3 rounded-l-md  px-3 mx-auto text-center"
              placeholder="Password"
              readOnly
            />
          </div>
          <div className="w-2/12">
            <button
              className="bg-blue-800  w-full h-full rounded-r-md cursor-pointer active:bg-blue-950 text-3xl"
              onClick={copyToClipboard}
            >
              COPY
            </button>
          </div>
        </div>

        <div className="flex justify-center align-middle ">
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className="cursor-pointer m-2 py-2"
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />

          <label id="" className=" text-white text-xl m-2 py-2">
            Length: {length}{" "}
          </label>
          <input
            id="default-checkbox"
            defaultChecked={num}
            onChange={() => {
              setNum((prev) => !prev);
            }}
            type="checkbox"
            value=""
            className="w-5 h-5 my-auto cursor-pointer mx-2 ml-6 p-1 "
          />
          <label
            id="default-checkbox"
            className="  text-white text-xl m-2 py-2"
          >
            Number
          </label>
          <input
            id="default-checkbox-char"
            defaultChecked={char}
            onChange={() => {
              setChar((prev) => !prev);
            }}
            type="checkbox"
            value=""
            className="w-5 h-5 my-auto cursor-pointer mx-2 ml-6 p-1 "
          />
          <label
            id="default-checkbox-char"
            className="  text-white text-xl m-2 py-2"
          >
            Character
          </label>
        </div>
      </div>
    </>
  );
}

export default App;
