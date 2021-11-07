import React, {useEffect, useRef} from 'react';
import clsx from "clsx";
import {useDropdown} from "../../Hooks/hook";

function DropDown({menuList, marginPos, top, setOpen, open, buttonRef}) {
    const ref = useRef()
    const { dropdownX, setDropdownX } = useDropdown()
    const addBox = document.querySelector('.add-box');
    const updateSize = () => {
        if (buttonRef.current){
            setDropdownX(buttonRef.current.offsetLeft - marginPos)
        }
    }

    useEffect(() => {
        updateSize()
        window.addEventListener("resize", updateSize);

        function handleClickOutside(event) {
            if (open && ref.current && !ref.current.contains(event.target)) {
                setOpen(false)
                addBox.style.zIndex = 5;
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, open])

    if (open && addBox){
        addBox.style.zIndex = 1;
    }



    return (<>
        <div ref={ref} className={clsx('dropdown', open ? 'active' : null)}
             style={{transform: `translate(${dropdownX}px, ${top}px)`}}>
            {menuList.length !== 0 ? <ul className='dropdown_list'>
                {menuList.map((elem, index) => {
                    return <li key={index} className='dropdown_item' onClick={() => {
                        elem.onClick()
                        setOpen(false)
                        addBox.style.zIndex = 5;
                    }}>
                        <div className="dropdown_item--icon">
                            {elem.icon}
                        </div>
                        <div className="dropdown_item--content">
                            {elem.name}
                        </div>
                    </li>
                })}
            </ul> : null}
        </div>
    </>);
}

export default DropDown;
