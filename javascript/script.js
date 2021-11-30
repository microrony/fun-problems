whr_embed(234415, {
	detail: 'titles',
	base: 'jobs',
	zoom: 'country',
	grouping: 'departments',
})

// Select the node that will be observed for mutations
const targetNode = document.getElementById('whr_embed_hook');

// Options for the observer (which mutations to observe)
const config = { attributes: true, childList: true, subtree: true };

// Callback function to execute when mutations are observed
const callback = function () {

const jobPostsGroup = document.querySelectorAll('.whr-group');

if(jobPostsGroup) {
		const jobs = [];
		jobPostsGroup.forEach(group => {
			const category = group.innerHTML;
			const jobPosts = group.nextElementSibling.children;
			const jobPostsArray = [...jobPosts];
			const roles = [];
			jobPostsArray.forEach(post => {
				const locationSpan = post?.querySelector('.whr-info .whr-location span');
						if(locationSpan) {
							locationSpan.remove();
						}
				const title = post.querySelector('.whr-title a').innerHTML;
				const location = post.querySelector('.whr-info .whr-location').innerHTML;
				const href = post.querySelector('.whr-title a').getAttribute('href');
				const role = { title, location, href };
				roles.push(role);
			});
			const job = { category, roles };
			jobs.push(job);
		});
		console.log(jobs)
	}
}

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
observer.observe(targetNode, config);
const getData = async () => {
	let res = await fetch("https://apply.workable.com/api/v1/widget/accounts/flexnow?details=true");
	let data = await res.json();
	let jobsData = data.jobs;

	
	data_sheet(jobsData);

}
getData();

class role {
	constructor(data) {
		this.href = data.application_url;
		this.tittle = data.title;
		this.location = data.city;
	}
}




function data_sheet(data){

	console.log(data);
	let used_departments = [];

	let auxilary = {};
	//auxilay = {
	// department : role;
	//}
	data.forEach(x => {
		department = x.department;

		
		if(!used_departments.includes(department)){

			used_departments.push(department);
			
			auxilary[department] = [];
			let r  = new role(x);
			auxilary[department].push(r);

		}else{
			let r  = new role(x);
			auxilary[department].push(r);
		}
		
	})


	jobPost(auxilary);
}

function jobPost(data){
	
	let jobData = [];

	keys = Object.keys(data);

	keys.forEach(x=> {

		let primary = {};

		primary.category = x;
		primary.role = data[x];
		jobData.push(primary)

	})
	console.log(jobData);
}
