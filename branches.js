// =============================================
//  BRANCH CODES & YEAR LOGIC
//  Add new branches here anytime!
// =============================================

const BRANCHES = {
  "001": { name: "B.Tech. Civil Engineering",                                         yearType: "btech" },
  "002": { name: "B.Tech. Chemical Engineering",                                      yearType: "btech" },
  "003": { name: "B.Tech. Computer Science & Engineering",                            yearType: "btech" },
  "004": { name: "B.Tech. Electronics & Communication Engineering",                   yearType: "btech" },
  "005": { name: "B.Tech. Electrical and Electronics Engineering",                    yearType: "btech" },
  "006": { name: "B.Tech. Electronics & Instrumentation Engineering",                 yearType: "btech" },
  "009": { name: "B.Tech. Mechanical Engineering",                                    yearType: "btech" },
  "010": { name: "B.Tech. Biotechnology",                                             yearType: "btech" },
  "011": { name: "B.Tech. Bioengineering",                                            yearType: "btech" },
  "012": { name: "B.Tech. Mechatronics",                                              yearType: "btech" },
  "013": { name: "B.Tech. Bioinformatics",                                            yearType: "btech" },
  "014": { name: "B.Tech. Information and Communication Technology",                  yearType: "btech" },
  "029": { name: "B.Com CA",                                                          yearType: "bcom"  },
  "071": { name: "MBA",                                                               yearType: "manual"},
  "087": { name: "BA LLB",                                                            yearType: "llb"   },
  "117": { name: "B.Com LLB",                                                         yearType: "llb"   },
  "118": { name: "BBA LLB",                                                           yearType: "llb"   },
  "126": { name: "B.Optom",                                                           yearType: "manual"},
  "136": { name: "B.Com BFSI",                                                        yearType: "bcom"  },
  "137": { name: "B.Sc. B.Ed Maths",                                                  yearType: "manual"},
  "139": { name: "BA B.Ed English",                                                   yearType: "manual"},
  "156": { name: "B.Tech. CSE (Artificial Intelligence & Data Science)",              yearType: "btech" },
  "157": { name: "B.Tech. CSE (Cyber Security & Block Chain Technology)",             yearType: "btech" },
  "158": { name: "B.Tech. CSE (IoT & Automation)",                                   yearType: "btech" },
  "159": { name: "B.Tech. EEE (Smart Grid and Electric Vehicles)",                   yearType: "btech" },
  "160": { name: "B.Tech. ECE (Cyber Physical Systems)",                              yearType: "btech" },
  "161": { name: "B.Tech. Mechanical Engineering (Digital Manufacturing)",            yearType: "btech" },
  "169": { name: "M.Sc. Integrated Biotechnology",                                   yearType: "manual"},
  "170": { name: "B.Tech. Aerospace Engineering",                                    yearType: "btech" },
  "179": { name: "B.Tech. Robotics & Artificial Intelligence",                       yearType: "btech" },
  "180": { name: "B.Tech. Electronics Engineering (VLSI Design & Technology)",       yearType: "btech" },
};

// Year lookup tables (BB digits → Year label)
const YEAR_TABLES = {
  btech: { "26": "4th Year", "27": "3rd Year", "28": "2nd Year", "29": "1st Year" },
  bcom:  { "26": "3rd Year", "27": "2nd Year", "28": "1st Year" },
  llb:   { "26": "5th Year", "27": "4th Year", "28": "3rd Year", "29": "2nd Year", "30": "1st Year" },
  manual: null,
};

/**
 * Parse a register number and return { branch, year, roll }
 * Format: 1 BB CCC DDD  (9 digits)
 */
function parseRegisterNo(regNo) {
  regNo = regNo.replace(/\s+/g, "");
  if (regNo.length !== 9) return null;

  const bb  = regNo.substring(1, 3);   // year digits
  const ccc = regNo.substring(3, 6);   // branch code
  const ddd = regNo.substring(6, 9);   // roll number

  const branchData = BRANCHES[ccc];
  if (!branchData) return { branch: "Unknown Branch (Code: " + ccc + ")", year: "—", roll: ddd, unknown: true };

  let year = "Fill Manually";
  const table = YEAR_TABLES[branchData.yearType];
  if (table) {
    year = table[bb] || "Fill Manually";
  }

  return { branch: branchData.name, year, roll: ddd };
}
