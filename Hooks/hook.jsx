import {useState} from "react";

export const useEditing = () => {
    const [isEditing, setIsEditing] = useState(false)
    return { isEditing, setIsEditing }
}

export const useOpen = () => {
    const [open, setOpen] = useState(false)
    return { open, setOpen }
}
export const useShow = () => {
    const [show, setShow] = useState(false)
    return { show, setShow }
}

export const useStyle = () => {
    const [style, setStyle] = useState('curved')
    return { style, setStyle }
}

export const useValue = () => {
    const [value, setValue] = useState('')
    return { value, setValue }
}

export const useDropdown = () => {
    const [dropdownX, setDropdownX] = useState(0)
    return { dropdownX, setDropdownX }
}
export const useFilter = () => {
    const [filter, setFilter] = useState(null)
    return { filter, setFilter }
}

export const useBox = () => {
    const [isEditing, setIsEditing] = useState(false)
    const [value, setValue] = useState('')
    const event = {
        preventDefault() {},
    };

    const handleClose = (e) => {
        e.preventDefault();
        setIsEditing(false)
        setValue('')
    }

    return { value, setValue, isEditing, setIsEditing,  handleClose, event}
}
