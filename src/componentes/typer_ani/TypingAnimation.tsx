import { TypeAnimation } from "react-type-animation";

function TypingAnimation() {
  return (
    <div>
        
      <TypeAnimation
        sequence={[
          "Lichu ChatGPT 🤖", 
          1500,
          "Chat With Own AI",
          1000,
          "Built With OpenAI",
          1500,
        ]}
        speed={50}
        style={{
          fontSize: "30px",
          color: "white",
          display: "inline-block",
          textShadow: "1px 1px 20px #000",
        }}
        repeat={Infinity}
      />
    </div>
  );
}

export default TypingAnimation;
