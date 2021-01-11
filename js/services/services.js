const postData = async (url, data )=>{
    const res = await fetch(url,{//запрос на сервер
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
       body: data
    });
    return await res.json();//возращаєм промис(возращає в обичний об'єкт)
};

  async function getResource (url){//get запрос(функція)
    let res = await fetch(url);//запрос на сервер
    if(!res.ok){
       throw new Error (`Could not fetch ${url},status:${res.status} `);//
    }
    return await res.json();//возращаєм промис(возращає в обичний об'єкт)
};

export {getResource};
export {postData};