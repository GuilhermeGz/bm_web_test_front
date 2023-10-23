import React, {
  forwardRef,
  Fragment,
  useImperativeHandle,
  useRef,
  useState,
  useEffect
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { GptIcon, BuzzIcon, Graphic, BtnDownload } from "../../assets";
import { insertNew } from "../../redux/messages";
import "./style.scss";

const Chat = forwardRef(({ error }, ref) => {

  const dispatch = useDispatch()

  const contentRef = useRef()

  const { user, messages } = useSelector((state) => state)
  const { latest, content, all } = messages

  const [showAfterBlink, setShowAfterBlink] = useState(false);

  const loadResponse = (stateAction,
    response = content,
    chatsId = latest?.id) => {
      
    setShowAfterBlink(false);

    clearInterval(window.interval)

    stateAction({ type: 'resume', status: true })

    contentRef?.current?.classList?.add("blink")

    let index = 0

    window.interval = setInterval(() => {
      if (index < response.length && contentRef?.current) {
        if (index === 0) {
          dispatch(insertNew({ chatsId, content: response.charAt(index) }))
          contentRef.current.innerHTML = response.charAt(index)
        } else {
          dispatch(insertNew({ chatsId, content: response.charAt(index), resume: true }))
          contentRef.current.innerHTML += response.charAt(index)
        }
        index++
      } else {
        stopResponse(stateAction)
      }
    }, 20)

  }

  const stopResponse = (stateAction) => {
    if (contentRef?.current) {
      contentRef.current.classList.remove('blink')
    }
    stateAction({ type: 'resume', status: false })
    clearInterval(window.interval)
    setShowAfterBlink(true); 
  }

  useImperativeHandle(ref, () => ({
    stopResponse,
    loadResponse,
    clearResponse: () => {
      if (contentRef?.current) {
        contentRef.current.innerHTML = ''
        contentRef?.current?.classList.add("blink")
        setShowAfterBlink(false);
      }
    }
  }))

  const someCondition = latest?.prompt?.length > 10;

  return (
    <div className='Chat'>
      {
        all?.filter((obj) => {
          return !obj.id ? true : obj?.id !== latest?.id
        })?.map((obj, key) => {
          return (
            <Fragment key={key}>
              <div className='qs'>
                <div className='acc'>
                  {user?.fName?.charAt(0)}
                </div>
                <div className='txt'>
                  {obj?.prompt}
                </div>
              </div>

              <div className="res">
                <div className='icon'>
                  <BuzzIcon />
                </div>
                <div className='txt'>
                  <span>
                    {obj?.content}
                  </span>
                  <h1>TESTANDO</h1>

                  <Graphic
                    title="Teste de gráfico 1"
                    uniqueId="1"
                  />

                  <BtnDownload/>
                </div>
              </div>
            </Fragment>
          )
        })
      }

      {
        latest?.prompt?.length > 0 && (
          <Fragment>
            <div className='qs'>
              <div className='acc'>
                {user?.fName?.charAt(0)}
              </div>
              <div className='txt'>
                {latest?.prompt}
              </div>
            </div>

            <div className="res">
              <div className='icon'>
                <BuzzIcon />
                {error && <span>!</span>}
              </div>
              <div className='txt'>
                {
                  error ? <div className="error">
                    Something went wrong. If this issue persists please contact us through our help center at help.openai.com.
                  </div> : (
                    <>
                      <span ref={contentRef} className="blink" />
                      {showAfterBlink && 
                        (
                          <>
                            <Graphic
                              title="Teste de gráfico 2"
                              uniqueId="1"
                            />
                            
                            <BtnDownload />
                          </>

                        )

                      } {}
                    </>
                  )
                }
              </div>
            </div>
          </Fragment>
        )
      }
    </div>
  )
})

export default Chat
