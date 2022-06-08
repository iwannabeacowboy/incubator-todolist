import React, {ChangeEvent} from 'react';

type CheckboxPropsType = {
    isDone: boolean
    callBack: (checked: boolean) => void
}

export const Checkbox = ({isDone, callBack}: CheckboxPropsType) => {

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        callBack(e.currentTarget.checked)
    }

    return (
        <input
            type="checkbox"
            checked={isDone}
            onChange={onChangeHandler}
        />
    );
};