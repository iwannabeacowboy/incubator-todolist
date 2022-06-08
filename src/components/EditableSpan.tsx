import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    callBack: (newTitle: string) => void
    className?: string
}

export const EditableSpan = memo(({title, callBack, className}:EditableSpanPropsType) => {

    const [edit, setEdit] = useState<boolean>(false)
    const [newTitle, setNewTitle] = useState<string>(title);

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value);
    }

    const onDoubleClickHandler = () => {
        setEdit(!edit)
        callBack(newTitle)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onDoubleClickHandler()
        }
    }

    return (
        edit ?
            <input
                type={'text'}
                value={newTitle}
                onChange={onChangeInputHandler}
                onBlur={onDoubleClickHandler}
                onKeyPress={onKeyPressHandler}
                autoFocus
            /> :
            <span
                className={className}
                onDoubleClick={onDoubleClickHandler}
            >
                {title}
            </span>
    );
});