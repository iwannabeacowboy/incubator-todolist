import React, {ChangeEvent, useState} from 'react';

type EditableSpanType = {
    title: string
    callBack: (newTitle: string) => void
    className?: string
}

export const EditableSpan: React.FC<EditableSpanType> = ({title, callBack, className}) => {

    const [edit, setEdit] = useState<boolean>(false)
    const [newTitle, setNewTitle] = useState<string>(title);

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value);
    }

    const onDoubleClickHandler = () => {
        setEdit(!edit)
        callBack(newTitle)
    }

    return (
        edit ?
            <input
                type={'text'}
                value={newTitle}
                onChange={onChangeInputHandler}
                onBlur={onDoubleClickHandler}
                autoFocus
            /> :
            <span
                className={className}
                onDoubleClick={onDoubleClickHandler}
            >
                {title}
            </span>
    );
};