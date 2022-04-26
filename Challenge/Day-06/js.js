const infoGithub = () => {

    let name = document.querySelector('.name');
    let repos = document.querySelector('.reposValue');   
    let followers = document.querySelector('.followersValue'); 
    let following = document.querySelector('.followingValue');
    let avatar = document.querySelector('.imageValue');  

    fetch("https://api.github.com/users/kevenalves").then(response => response.json()).then(info => {
        let nameInfo = info.name;
        let avatarInfo = info.avatar_url;
        let followerInfo = info.followers;
        let followingInfo = info.following;
        let reposInfo = info.public_repos;

       name.textContent = nameInfo;
       repos.textContent = reposInfo;
       followers.textContent = followerInfo;
       following.textContent = followingInfo;
       avatar.setAttribute('src', avatarInfo);

    }).catch(e => {
        console.log(e)
    })
}

infoGithub()
