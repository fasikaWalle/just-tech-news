
async function upvoteClickHandler(event){
    event.preventDefault()
// const user_id=
const id=window.location.toString().split('/')[window.location.toString().split('/').length-1];
console.log(id)
const response=await fetch('/api/users/upvote',{
    method:'put',
    body:JSON.stringify({
        post_id:id
    }),
    headers:{
        'Content_Type':'appliction/json'
    }
});
if(response.ok){

    document.location.reload()
}else{
    alert(response.statusText)
}
}







document.querySelector('.upvote-btn').addEventListener('click',upvoteClickHandler)