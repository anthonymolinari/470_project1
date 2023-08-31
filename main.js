// CS-470 project 1: Can be taken concurrently
// author: Anthony Molinari
// Fall 2023
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

// Breadth first traversial of prereq chains
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

const takeConcurrently = (course_a, course_b) => {
  return (
    takeConcurrentlyHelper(`CS ${course_a}`, `CS ${course_b}`)
    && takeConcurrentlyHelper(`CS ${course_b}`, `CS ${course_a}`)
  );
}
  
if (process.argv.length < 4) {
  console.error('Expected at least two arguments. Exiting...')
  process.exit(1);
}

const args = [process.argv[2],process.argv[3]];

if (takeConcurrently(args[0], args[1]))
  console.log(`${args[0]} and ${args[1]} can be taken concurrently`);
else
  console.log(`${args[0]} and ${args[1]} can not be taken concurretly`);
