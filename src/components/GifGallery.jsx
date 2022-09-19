import { useState } from "react";

export const GifGallery = ({ gifList, onNewGifAdded }) => {
  const [inputValue, setInputValue] = useState("");

  const onInputChange = (event) => {
    const { value } = event.target;
    setInputValue(value);
  };

  const onGifAdd = () => {
    // TODO: add better validation
    if (inputValue.length > 0) {
      console.log("Gif link:", inputValue);

      onNewGifAdded(inputValue);
      setInputValue("");
    } else {
      console.log("Empty input. Try again.");
    }
  };

  return (
    <div className="connected-container">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onGifAdd();
        }}
      >
        <input type="text" placeholder="Enter gif link!" value={inputValue} onChange={onInputChange} />
        <button type="submit" className="cta-button submit-gif-button">
          Submit
        </button>
      </form>
      <div className="gif-grid">
        {gifList.map((gif) => (
          <div className="gif-item" key={gif}>
            <img src={gif} alt={gif} />
          </div>
        ))}
      </div>
    </div>
  );
};
