document.addEventListener('DOMContentLoaded', function(){
    function getStorageData(){
        return {'src':localStorage.getItem('SRC'), 'price':localStorage.getItem('PRICE'),'desc':localStorage.getItem('DESC')}
    }

    function clearStorage(){
        localStorage.clear()
        localStorage.removeItem('SCR')
        localStorage.removeItem('PRICE')
        localStorage.removeItem('DESC')
    }

    function appeninfo(){
        const data = getStorageData()
        document.querySelector('#selectedImage').src = data.src
        document.querySelector('#selectedPrice').innerText = data.price
        document.querySelector('.desc_contents').innerText = data.desc
        clearStorage()
    }
    appeninfo()
})

