export default {
  biu: {
    'biu-csc': {
      id: 'biu-csc',
      name: 'Computer Science',
      structure: {
        fulltime: {
          name: 'Computer Science',

          label: 'Full Time',
          structure: {
            '1$1': {
              'CSC 111': 4,
              'CSC 112': 4,
              'MTH 111': 4,
              'MTH 112': 4,
              'PHY 111': 4,
              'PHY 113': 4,
              'CHM 111': 4,
              'GST 111': 4,
              'GST 112': 4,
              'GST 113': 4,
              'IDS 111': 4,
              'FRN 111': 4
            },
            '1$2': {
              'CSC 121': 4,
              'CSC 122': 4,
              'MTH 121': 4,
              'MTH 122': 4,
              'PHY 121': 4,
              'GST 121': 4,
              'GST 122': 4,
              'GST 124': 4,
              'IDS 121': 4,
              'FRN 121': 4
            },
            '2$1': {
              'CSC 211': 4,
              'CSC 212': 4,
              'CSC 213': 4,
              'CSC 214': 4,
              'CSC 215': 4,
              'CSC 216': 4,
              'CSC 217': 4,
              'MTH 211': 4,
              MTH212: 4
            },
            '2$2': {
              'CSC 221': 4,
              'CSC 222': 4,
              'CSC 223': 4,
              'CSC 225': 4,
              'CSC 226': 4,
              'MTH 222': 4,
              'MTH 223': 4,
              'GST 222': 4,
              'CSC 224': 4
            },
            '3$1': {
              'CSC 311': 4,
              'CSC 312': 4,
              'CSC 313': 4,
              'CSC 314': 4,
              'CSC 315': 4,
              'CSC 316': 4,
              'CSC 317': 4,
              'CSC 318': 4,
              'MTH 310': 4
            },
            '3$2': {
              siwes: 4
            },
            '4$1': {
              biu$csc$411: 4,
              biu$csc$412: 4,
              biu$csc$416: 4,
              biu$csc$418: 4,
              biu$csc$413: 4,
              biu$csc$414: 4,
              biu$csc$415: 4,
              biu$ent$318: 4
            },
            '4$2': {
              biu$csc$421: 4,
              biu$csc$424: 4,
              biu$csc$425: 4,
              biu$csc$426: 4,
              biu$csc$427: 4,
              biu$ent$328: 4
            }
          },
          levelWeight: {
            1: 0.05,
            2: 0.2,
            3: 0.35,
            4: 0.4
          },
          numOfYears: 4,
          currentLevel: 1,
          currentSemester: 1
        }
      },
      courses: {
        /////100L1
        'CSC 111': {
          id: 'CSC 111',
          name: 'Introduction to Computing I',
          creditLoad: 2
        },
        'CSC 112': {
          id: 'CSC 112',
          name: 'Introduction to Computer Practical',
          creditLoad: 1
        },
        'MTH 111': {
          id: 'MTH 111',
          name: 'Algebra and Trigonometry',
          creditLoad: 3
        },
        'MTH 112': {
          id: 'MTH 112',
          name: 'Statistics for Physical Sciences and Engineering',
          creditLoad: 3
        },
        'PHY 111': { id: 'PHY 111', name: 'General Physics', creditLoad: 3 },
        'PHY 113': {
          id: 'PHY 113',
          name: 'General Physics Laboratory I',
          creditLoad: 1
        },
        'CHM 111': {
          id: 'CHM 111',
          name: 'General Chemistry I (Physical and Inorganic)',
          creditLoad: 3
        },
        'GST 111': {
          id: 'GST 111',
          name: 'Communication in English I',
          creditLoad: 2
        },
        'GST 112': {
          id: 'GST 112',
          name: 'Logic Philosophy and Human Existence',
          creditLoad: 2
        },
        'GST 113': {
          id: 'GST 113',
          name: 'Nigerian People and Culture',
          creditLoad: 2
        },
        'IDS 111': {
          id: 'IDS 111',
          name: 'Rudiments of Christian Life',
          creditLoad: 1
        },
        'FRN 111': {
          id: 'FRN 111',
          name: 'Communication in French I',
          creditLoad: 1
        },

        /////100L2

        'CSC 121': {
          id: 'CSC 121',
          name: 'Introduction to computing II',
          creditLoad: 2
        },
        'CSC 122': {
          id: 'CSC 122',
          name: 'Introduction to BASIC practical',
          creditLoad: 1
        },
        'MTH 121': {
          id: 'MTH 121',
          name: 'Vector and Geometry',
          creditLoad: 3
        },
        'MTH 122': { id: 'MTH 122', name: 'Calculus', creditLoad: 3 },
        'PHY 121': { id: 'PHY 121', name: 'General physics II', creditLoad: 3 },
        'GST 121': {
          id: 'GST 121',
          name:
            'Use of Library, study skills and Information and Communication Technology [ICT]',
          creditLoad: 2
        },
        'GST 122': {
          id: 'GST 122',
          name: 'Communication in English II',
          creditLoad: 2
        },
        'GST 124': {
          id: 'GST 124',
          name: 'History and Philosophy of Science',
          creditLoad: 2
        },
        'IDS 121': {
          id: 'IDS 121',
          name: 'Life and Times of Archbishop Benson Idahosa',
          creditLoad: 1
        },
        'FRN 121': {
          id: 'FRN 121',
          name: 'Communication in French II',
          creditLoad: 1
        },

        /////// 200L1

        'CSC 211': {
          id: 'CSC 211',
          name: 'Business Application and file processing',
          creditLoad: 2
        },
        'CSC 212': {
          id: 'CSC 212',
          name: 'Structured programming and Algorithm',
          creditLoad: 3
        },
        'CSC 213': { id: 'CSC 213', name: 'DBMS and SQL', creditLoad: 2 },
        'CSC 214': {
          id: 'CSC 214',
          name: 'Digital Computer Design',
          creditLoad: 3
        },
        'CSC 215': {
          id: 'CSC 215',
          name: 'Visual Basic Programming',
          creditLoad: 2
        },
        'CSC 216': {
          id: 'CSC 216',
          name: 'Visual Basic Practical',
          creditLoad: 1
        },
        'CSC 217': { id: 'CSC 217', name: 'SQL Practical', creditLoad: 1 },
        'MTH 211': { id: 'MTH 211', name: 'Linear Algebra', creditLoad: 3 },
        MTH212: { id: 'MTH212', name: 'Set Logic and Algebra', creditLoad: 3 },

        ///200L2
        'CSC 221': {
          id: 'CSC 221',
          name: 'Data structure and Processing',
          creditLoad: 2
        },
        'CSC 222': { id: 'CSC 222', name: 'C++ Programming', creditLoad: 2 },
        'CSC 223': {
          id: 'CSC 223',
          name: 'Assembly language programming',
          creditLoad: 2
        },
        'CSC 225': { id: 'CSC 225', name: 'C++ Practical', creditLoad: 1 },
        'CSC 226': {
          id: 'CSC 226',
          name: 'Assembly Language Practical',
          creditLoad: 1
        },
        'MTH 222': {
          id: 'MTH 222',
          name: 'Operations research',
          creditLoad: 3
        },
        'MTH 223': {
          id: 'MTH 223',
          name: 'Introduction to Numerical Analysis',
          creditLoad: 3
        },
        'GST 222': {
          id: 'GST 222',
          name: 'Peace and Conflict Resolution',
          creditLoad: 2
        },
        'CSC 224': {
          id: 'CSC 224',
          name: 'Digital Computer Design II',
          creditLoad: 3
        },

        ///300L1
        'CSC 311': {
          id: 'CSC 311',
          name: 'Programming in Java',
          creditLoad: 2
        },
        'CSC 312': {
          id: 'CSC 312',
          name: 'Compiler Construction',
          creditLoad: 3
        },
        'CSC 313': {
          id: 'CSC 313',
          name: 'Principles of Operating System',
          creditLoad: 3
        },
        'CSC 314': {
          id: 'CSC 314',
          name: 'Computer Architecture and Organization',
          creditLoad: 3
        },
        'CSC 315': {
          id: 'CSC 315',
          name: 'Network and Graph Theory',
          creditLoad: 3
        },
        'CSC 316': { id: 'CSC 316', name: 'Computer Network', creditLoad: 3 },
        'CSC 317': {
          id: 'CSC 317',
          name: 'Real time application for Computer Systems',
          creditLoad: 3
        },
        'CSC 318': { id: 'CSC 318', name: 'Java Practical', creditLoad: 1 },
        'MTH 310': {
          id: 'MTH 310',
          name: 'Numerical Methods I',
          creditLoad: 3
        },

        //// 300L2
        siwes: {
          id: 'siwes',
          name: 'S.I.W.E.S (IT)',
          creditLoad: 6
        },

        /////400L1
        biu$csc$411: {
          id: 'biu$csc$411',
          name: 'NET-CENTRIC COMPUTING',
          creditLoad: 3
        },
        biu$csc$412: {
          id: 'biu$csc$412',
          name: 'SOFTWARE ENGINEERING',
          creditLoad: 3
        },
        biu$csc$413: {
          id: 'biu$csc$413',
          name: 'ADVANCED DATABASE MANAGEMENT SYSTEM',
          creditLoad: 3
        },
        biu$csc$414: {
          id: 'biu$csc$414',
          name: 'SYSTEM ANALYSIS AND DESIGN',
          creditLoad: 3
        },
        biu$csc$415: {
          id: 'biu$csc$415',
          name: 'ARTIFICIAL INTELLIGENCE',
          creditLoad: 3
        },
        biu$csc$416: { id: 'biu$csc$416', name: 'SEMINAR', creditLoad: 2 },
        biu$csc$418: {
          id: 'biu$csc$418',
          name: 'HUMAN COMPUTING INTERFACE',
          creditLoad: 2
        },
        biu$ent$318: {
          id: 'biu$ent$318',
          name: 'INTRODUCTION TO ENTREPRENEURIAL SKILLS',
          creditLoad: 2
        },
        ///////400L2
        biu$csc$421: {
          id: 'biu$csc$421',
          name: 'SURVEY OF PROGRAMMING LANGUAGES',
          creditLoad: 3
        },
        biu$csc$424: {
          id: 'biu$csc$424',
          name: 'LEGAL ASPECTS OF ICT',
          creditLoad: 3
        },
        biu$csc$425: {
          id: 'biu$csc$425',
          name: 'SYSTEM PROGRAMMING',
          creditLoad: 3
        },
        biu$csc$426: {
          id: 'biu$csc$426',
          name: 'RESEARCH PROJECT',
          creditLoad: 6
        },
        biu$csc$427: {
          id: 'biu$csc$427',
          name: 'FORMAL LANGUAGE AND AUTOMATA',
          creditLoad: 2
        },
        biu$ent$328: {
          id: 'biu$ent$328',
          name: 'ENTREPRENURE II',
          creditLoad: 2
        }
      }
    },
    biu$cve: {
      id: 'biu$cve',
      name: 'Civil Engineering',
      structure: {
        fulltime: {
          name: 'Civil Engineering',

          label: 'Full Time',
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
            1: 0.05,
            2: 0.2,
            3: 0.35,
            4: 0.4
          },
          numOfYears: 4,
          currentLevel: 1,
          currentSemester: 1
        }
      },
      courses: {}
    }
  }
}
