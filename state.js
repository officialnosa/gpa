export default {
  school: {
    name: 'Benson idahosa University',
    gradingSystem: {
      firstClass: 4.0,
      secondClassUpper: 3.5,
      secondClassLower: 2.5,
      thirdClass: 2.0,
      fail: 1
    }
  },
  field: {
    id: 'biu$csc',
    name: 'Computer Science',
    courses: { biu$csc$416: 1, biu$csc$418: 1 },
    structure: {
      '1$1': {},
      '1$2': {},
      '2$1': {},
      '2$2': {},
      '3$1': {},
      '3$2': {},
      '4$1': {},
      '4$2': {}
    },
    levelWeight: {
      year1: 0.5,
      year2
    }
  },
  courses: {
    biu$csc$411: { name: 'NET-CENTRIC COMPUTING', creditLoad: 3 },
    biu$csc$412: { name: 'SOFTWARE ENGINEERING', creditLoad: 3 },
    biu$csc$413: {
      name: 'ADVANCED DATABASE MANAGEMENT SYSTEM',
      creditLoad: 3
    },
    biu$csc$414: { name: 'SYSTEM ANALYSIS AND DESIGN', creditLoad: 3 },
    biu$csc$415: { name: 'ARTIFICIAL INTELLIGENCE', creditLoad: 3 },
    biu$csc$416: { name: 'SEMINAR', creditLoad: 2 },
    biu$csc$418: { name: 'HUMAN COMPUTING INTERFACE', creditLoad: 2 },
    biu$ent$318: {
      name: 'INTRODUCTION TO ENTREPRENEURIAL SKILLS',
      creditLoad: 2
    }
  }
}
