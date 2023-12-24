import {useEffect} from "react";
import {ToastUtility} from "@syncfusion/ej2-react-notifications";

const useToastHook = ({message, errors})=> {
    const getToastIcon = (type)=> {
        switch (type) {
            case 'success':
                return 'fa-solid fa-circle-check'
            case 'info':
                return 'fa-solid fa-circle-info'
            case 'error':
                return 'fa-solid fa-circle-xmark'
            case 'warning':
                return 'fa-solid fa-triangle-exclamation'
        }
    }
    const getToastCss = (type)=> {
        switch (type) {
            case 'success':
                return 'e-toast-success'
            case 'info':
                return 'e-toast-info'
            case 'error':
                return 'e-toast-danger'
            case 'warning':
                return 'e-toast-warning'
        }
    }

    useEffect(()=> {
        if(message) {
            ToastUtility.show({
                title: message.title,
                animation: {
                    show: {effect:'FadeZoomIn'},
                    hide: {effect:'FadeZoomOut'},
                },
                position: {
                    X: 'Right',
                },
                icon: getToastIcon(message.type),
                content: message.content,
                cssClass: getToastCss(message.type),
                timeOut: 3500,
                extendedTimeOut: 10000,
                showCloseButton: true
            })
        }
    }, [message])


    useEffect(()=> {
        if(errors && Object.keys(errors).length !== 0) {
            let content = ''
            for (const [key, value] of Object.entries(errors)) {
                content += ('- '+value+'<br>')
            }

            ToastUtility.show({
                title: 'Attention :',
                animation: {
                    show: {effect:'FadeZoomIn'},
                    hide: {effect:'FadeZoomOut'},
                },
                position: {
                    X: 'Right',
                },
                icon: 'fa-solid fa-circle-xmark',
                content: content,
                cssClass: 'e-toast-danger',
                timeOut: 3500,
                extendedTimeOut: 10000,
                showCloseButton: true
            })
        }
    }, [errors])
}

export default useToastHook
