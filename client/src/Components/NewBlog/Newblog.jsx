import React, { useContext, useState } from 'react'
import axios from "axios";
import { userContext } from '../../Context/Context';
function Newblog() {
    const { user } = useContext(userContext)
    const [heading, setHeading] = useState('')
    const [content, setContent] = useState('')
    const submit = async (e) => {
        e.preventDefault()
        try {
            await axios.post("http://localhost:5000/newblog", {
                authorName: user.displayName, heading, content,
            }).then((response) => console.log(response.data.message))

        } catch (e) {
            console.log("error:" + e);
        }
    }
    return (
        <>
            <form action="POST" >
                <label htmlFor="">Heading</label>
                <input type="text" value={heading} onChange={(e) => setHeading(e.target.value)} /><br />
                <label htmlFor="">content</label>
                <textarea value={content} onChange={(e) => setContent(e.target.value)}>
                </textarea>
                <button type="submit" onClick={submit}>submit</button>
            </form>
        </>
    )
}

export default Newblog