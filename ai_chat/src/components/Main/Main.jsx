import ReactMarkdown from 'react-markdown';
import React, { useContext, useEffect, useState } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'

const Main = () => {
    const [displayedText, setDisplayedText] = useState("");


  const { onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input
  } = useContext(Context);


  useEffect(() => {
  if (loading) {
    setDisplayedText("");
    return;
  }

  if (!resultData) {
    setDisplayedText("");
    return;
  }

  let index = 0;

  setDisplayedText("");

  const interval = setInterval(() => {
    setDisplayedText(resultData.slice(0, index + 1));
    index++;

    if (index >= resultData.length) {
      clearInterval(interval);
    }
  }, 15);

  return () => clearInterval(interval);
}, [resultData, loading]);


  return (
    <div className='main'>
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="" />
      </div>
      <div className="main-container">
        {showResult
          ? <div className="result">
            <div className='result-title'>
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>
            

            <div className="result-data">
    <img src={assets.gemini_icon} alt="" />

    <div className="markdown-content">
        {loading
            ? <div className="loader">
                <hr className="animated-bg" />
                <hr className="animated-bg" />
                <hr className="animated-bg" />
              </div>
            // : <ReactMarkdown>{resultData}</ReactMarkdown>
            : <ReactMarkdown>{displayedText}</ReactMarkdown>
        }
    </div>
</div>

          </div>
          : <>
            <div className="greet">
              <p><span>Hello, Dev.</span></p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              <div className="card">
                <p>Suggest beautiful places to see on an upcoming road trip</p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div className="card">
                <p>Briefly summarize this concept: urban planning</p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div className="card">
                <p>Brainstorm team bonding activities for our work retreat</p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div className="card">
                <p>Improve the readability of the following code</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
        }



        <div className="main-bottom">
          <div className="search-box">
            {/* <input onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder='Enter a prompt here' /> */}
                  <input
                onChange={(e) => setInput(e.target.value)}
                value={input}
                type="text"
                placeholder="Enter a prompt here"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && input.trim() && !loading) {
                    onSent();
                  }
                }}
              />
            <div>
              <img src={assets.gallery_icon} width={30} alt="" />
              <img src={assets.mic_icon} width={30} alt="" />
              {input ? <img onClick={() => onSent()} src={assets.send_icon} width={30} alt="" /> : null}

            </div>
          </div>
          <p className="bottom-info">
            Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps
          </p>
        </div>
      </div>
    </div>
  )
}

export default Main
