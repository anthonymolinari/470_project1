// CS-470 project 1
// author: Anthony Molinari

const course_data = require('./cs_prerequisites.json');

const findPreReqs = (course) => {
  let prereqs = new Set();
  course_data.courses[course]['course_pre_reqs'].forEach(elm => {
    for ( let c of elm.courses)
      Object.keys(c).forEach(currentItem => {
        prereqs.add(currentItem);
      });
  });
  return prereqs;
}

const takeConcurrentlyHelper = (course_a, course_b) => {  
  if (course_a === course_b)
    return false;
    
  const prereqs = findPreReqs(course_a);
  
  for (let c of prereqs) {
    if (!takeConcurrentlyHelper(c, course_b))
      return false
  }
  
  return true;
}

const takeConcurrently = (course_a, course_b) => takeConcurrentlyHelper(`CS ${course_a}`, `CS ${course_b}`);
  
if (process.argv.length < 4) {
  console.error('Expected at least two arguments. Exiting...')
  process.exit(1);
}

const args = [process.argv[2],process.argv[3]];

if (takeConcurrently(args[0], args[1]) && takeConcurrently(args[1], args[0]))
  console.log(`${args[0]} and ${args[1]} can be taken concurrenyly`);
else
  console.log(`${args[0]} and ${args[1]} can not be taken concurrenyly`);