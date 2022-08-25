const now = new Date();

// Feb 13th, 2001
let age = now.getFullYear() - 2001 - (now < new Date(now.getFullYear(), 1, 13) ? 1 : 0);

// March 1st, 2023
const graduated = now < new Date(2023, 2, 1);

export default [
	{
		question: "Can you introduce yourself?",
		answer: `\
			I’m Aurélien. I’m ${age} years old. I was born in Mountain View, CA, USA. I then moved to Paris, France for all of my studies up to my engineering degree in computer science. ${
				graduated
					? 'I will be graduating from Efrei Paris next March (2023).'
					: 'I graduated from Efrei Paris in 2023.'
			}\
		`
	},
	{
		question: "How did you get into the tech world?",
		answer: "\
			I’ve always been profoundly curious about how things work, especially the apps that I used on the computer as a child.<br/>\
			Since I was already immersed in IT culture at home, I had all the tools needed to start exploring available at a young age. So, I jumped in and never left.\
		"
	},
	{
		question: "How long have you been working in tech?",
		answer: "\
			My first steps in computer science took place in 2011. I was then trying to grasp concepts by reading documentation and experimenting with scripts.<br/>\
			I would say I only became a <i>web developer</i> a year later in 2012, and a <i>Java</i> developer in 2013. I earned my first buck by selling my services and software around that time. I then created a video games organization with a friend.<br/>\
			In 2016, I began working with bigger corporations on more complex business-grade projects. I founded my own service company in 2019, at 18 years old.\
		"
	},
	{
		question: "What did you study in college? How did you acquire your knowledge?",
		answer: "\
			I joined Efrei Paris, engineering school of digital technologies, in 2018. It has consistently been <a href=\"https://eng.efrei.fr/the-school/rankings/\" target=\"_blank\" rel=\"nofollow external\">ranked in the top computer science schools in France</a>.<br/>\
			I majored in <i>Cloud Architecture/DevOps</i>, minoring as <i>Certified Ethical Hacker</i>.<br/>\
			The vast majority of my know-how is self-taught though. Because I was already proficient before entering college, I used those 5 years to build professional experience and to learn the codes of the professional world.\
		"
	},
	{
		question: "What are some of your most prominent qualities?",
		answer: "\
			<i>1.</i> I have advanced <i>problem-solving</i> skills, including with highly abstract concepts. I’m thus able to see the bigger picture in complex environments.<br/>\
			<i>2.</i> I pay great <i>attention to detail</i>. Trailing whitespace? None. Spacing? To the pixel. Algorithms? Optimized. Edge cases? Covered. <sub>Hotel? Trivago.</sub><br/>\
			<i>3.</i> I’m highly <i>reliable</i> and <i>dependable</i>, even in stressful and/or time-sensitive contexts. I’m often referred to as the cornerstone of teamwork I take part in.<br/>\
			<i>4.</i> I’m <i>honest</i> about my work and in the feedback that I give. I can give constructive criticism about others’ work, and mine too. I own my mistakes.\
		"
		//  <i>5.</i> I’m an extremely <i>fast-learner</i>: I learn new tools in a day, and achieve a comprehensive understanding within a month. It led to me being very flexible, as I have worked in plenty of different environments and can adapt instantly.<br/>\
	},
	{
		question: "What are your 3 biggest weaknesses?",
		answer: "\
			<i>1.</i> I’m fairly <i>uncomprising</i> in my decisions and personal interactions. I do not praise easily. And I struggle settling for suboptimal solutions to save time.<br/>\
			<i>2.</i> I’m rather <i>taciturn</i>. I’m more productive and only reach flow state alone. I usually prefer exploring solutions by myself rather than being dependent.<br/>\
			<i>3.</i> I have a hard time working in <i>unchanging contexts</i>. I need to be able to acquire new skills and discover new situations constantly to stay motivated.\
		"
	},
	{
		question: "What are you passionate about?",
		answer: "\
			First of all, high tech, obviously. I’ve spent most of my spare time of the past 10+ years working on either computer software or hardware.<br/>\
			I also like playing video games and driving cars. I love reading about space, aircrafts, and more generally innovation in science.<br/>\
			Finally, I’m committed to the environment, and have been for over 6 years.\
		"
	},
	{
		question: "What are your mid-term career objectives?",
		answer: "\
			I aim at working for a leader in tech, where I can evolve and discover new career paths. Additionally, I’m thrilled by solving challenging issues at a global scale and being impactful in IT. I strongly believe I can be a real asset for doing so through innovation as well as consolidation.<br/>\
			I would also like to travel around the world while working remotely sometimes. Even if that means having to attend meetings in the middle of the night.\
		"
	}
]
