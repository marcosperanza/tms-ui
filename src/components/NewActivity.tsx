import * as React from "react"
import {Activity} from "../generated/api";

type Props = {
    createActivity: (activity: Activity | any) => void
}

export const NewActivity: React.FC<Props> = ({ createActivity }) => {


    const [article, setArticle] = React.useState<Activity | {}>()

    const handleArticleData = (e: React.FormEvent<HTMLInputElement>) => {
        setArticle({
            ...article,
            [e.currentTarget.id]: e.currentTarget.value,
        })
    }

    const addNewArticle = (e: React.FormEvent) => {
        e.preventDefault()
        createActivity(article)
    }

    return (
        <form onSubmit={addNewArticle} className="Add-article">
            <input
                type="text"
                id="description"
                placeholder="Title"
                onChange={handleArticleData}
            />
            <input
                type="text"
                id="body"
                placeholder="Description"
                onChange={handleArticleData}
            />
            <button disabled={article === undefined ? true : false}>
                Add article
            </button>
        </form>
    )
}
