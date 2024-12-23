import { useState } from "react"
import { SOCKET_EMIT_SEND_ANSWER, socketService } from "../../services/socket.service"
import { makeId } from "../../services/util.service"

export function GiveAnswer({ question, close }) {
    const [content, setContent] = useState('')

    // Function to handle changes in the textarea (user typing the answer)
    function handleChange({ target }) {
        const { value } = target
        setContent(value) 
    }

    // Function to submit the answer and emit it via socket
    function submit() {
        const answer = {
            content,
            askerId: question.userId,
            question: question.content,
            id: makeId()
        }
        socketService.emit(SOCKET_EMIT_SEND_ANSWER, answer)
        close()
    }

    return <section className="give-answer">
        <h3>{question.content}</h3>
        <textarea value={content} onChange={handleChange} ></textarea>
        <button onClick={close}>x</button>
        <button onClick={submit}>Submit</button>
    </section>
}
