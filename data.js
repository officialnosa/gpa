export default {
  schools: {
    biu: {
      displayName: 'Benson idahosa University',
      gradingSystem: {
        firstClass: 4.0,
        secondClassUpper: 3.5,
        secondClassLower: 2.5,
        thirdClass: 2.0,
        fail: 1
      }
    }
  },
  fields: {
    biu$csc: {
      displayName: 'Computer Science',
      courses: ['biu$csc416', 'biu$csc418']
    }
  },
  courses: {
    biu$csc411: { displayName: 'NET-CENTRIC COMPUTING', creditLoad: 3 },
    biu$csc412: { displayName: 'SOFTWARE ENGINEERING', creditLoad: 3 },
    biu$csc413: {
      displayName: 'ADVANCED DATABASE MANAGEMENT SYSTEM',
      creditLoad: 3
    },
    biu$csc414: { displayName: 'SYSTEM ANALYSIS AND DESIGN', creditLoad: 3 },
    biu$csc415: { displayName: 'ARTIFICIAL INTELLIGENCE', creditLoad: 3 },
    biu$csc416: { displayName: 'SEMINAR', creditLoad: 2 },
    biu$csc418: { displayName: 'HUMAN COMPUTING INTERFACE', creditLoad: 2 },
    biu$ent318: {
      displayName: 'INTRODUCTION TO ENTREPRENEURIAL SKILLS',
      creditLoad: 2
    }
  }
}
