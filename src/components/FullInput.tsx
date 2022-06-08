import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';

type FullInputPropsType = {
    callBack: (title: string) => void
}

export const FullInput = memo(({callBack}: FullInputPropsType) => {

    const [titleValue, setTitleValue] = useState<string>('');
    const [error, setError] = useState<boolean>(false)

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitleValue(e.currentTarget.value);
        error && setError(false)
    }

    const addTaskHandler = () => {
        const trimmedTitle = titleValue.trim();
        if (!!trimmedTitle) {
            callBack(trimmedTitle);
            setTitleValue('');
        } else {
            setError(true)
        }
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTaskHandler();
        }
    }

    return (
        <div>
            <input
                type="text" value={titleValue}
                onChange={onChangeInputHandler}
                onKeyPress={onKeyPressHandler}
                className={error ? 'error' : ''}
            />

            <button onClick={addTaskHandler}>+</button>
            {error && <div className={'error-message'}>Title is required</div>}
        </div>
    );
});