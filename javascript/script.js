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

  console.log(jobsData);

}

getData();