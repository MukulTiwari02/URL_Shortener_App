export const copyUrl = (e) => {
    let text = document.querySelector('.short-url').innerHTML;
    const copyContent = async () => {
        try {
        await navigator.clipboard.writeText(text);
        e.target.innerHTML = 'Copied'
        // alert('Content copied to clipboard');
        } catch (err) {
        alert('Failed to copy: ', err);
        }
    }
    copyContent();
    setTimeout(()=>{
        e.target.innerHTML = 'Copy'
    }, 1500)
}

export const copyQR = (e) => {
    let text = document.querySelector('.qr-image').src;
    const copyContent = async () => {
        try {
        await navigator.clipboard.writeText(text);
        e.target.innerHTML = 'Copied'
        // alert('Content copied to clipboard');
        } catch (err) {
        alert('Failed to copy: ', err); 
        }
    }
    copyContent();
    setTimeout(()=>{
        e.target.innerHTML = 'Copy'
    }, 1500)
}

export const shareUrl = () => {}

export const downloadQR = () => {}