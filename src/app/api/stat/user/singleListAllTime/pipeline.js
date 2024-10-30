export const allTimePipeline = (userId, list) => [
    {
      '$match': {
        'authId': userId
      }
    }, {
      '$unwind': '$stats.monthly'
    }, {
      '$project': {
        '_id': '$stats.monthly.year', 
        'year': '$stats.monthly.year', 
        'books': `$stats.monthly.${list}.booksRead`,
        'pages': `$stats.monthly.${list}.pagesRead`,
        'genre': `$stats.monthly.${list}.genreRead`,
        'theme': `$stats.monthly.${list}.themeRead`,
        'pace': `$stats.monthly.${list}.paceRead`
      }
    }, {
      '$group': {
        '_id': 'All-Time', 
        'books': {
          '$push': {
            'year': '$year', 
            'count': '$books'
          }
        }, 
        'pages': {
          '$push': {
            'year': '$year', 
            'count': '$pages'
          }
        }, 
        'genres': {
          '$push': '$genre'
        }, 
        'themes': {
          '$push': '$theme'
        }, 
        'paces': {
          '$push': '$pace'
        }
      }
    }, {
      '$unwind': '$books'
    }, {
      '$group': {
        '_id': {
          'id': '$_id', 
          'year': '$books.year'
        }, 
        'bookCount': {
          '$sum': '$books.count'
        }, 
        'pages': {
          '$first': '$pages'
        }, 
        'genres': {
          '$first': '$genres'
        }, 
        'themes': {
          '$first': '$themes'
        }, 
        'paces': {
          '$first': '$paces'
        }
      }
    }, {
      '$group': {
        '_id': '$_id.id', 
        'totalBooks': {
          '$addToSet': {
            'year': '$_id.year', 
            'count': '$bookCount'
          }
        }, 
        'pages': {
          '$first': '$pages'
        }, 
        'genres': {
          '$first': '$genres'
        }, 
        'themes': {
          '$first': '$themes'
        }, 
        'paces': {
          '$first': '$paces'
        }
      }
    }, {
      '$unwind': '$pages'
    }, {
      '$group': {
        '_id': {
          'id': '$_id', 
          'year': '$pages.year'
        }, 
        'totalBooks': {
          '$first': '$totalBooks'
        }, 
        'pagesCount': {
          '$sum': '$pages.count'
        }, 
        'pages': {
          '$first': '$pages'
        }, 
        'genres': {
          '$first': '$genres'
        }, 
        'themes': {
          '$first': '$themes'
        }, 
        'paces': {
          '$first': '$paces'
        }
      }
    }, {
      '$group': {
        '_id': '$_id.id', 
        'totalBooks': {
          '$first': '$totalBooks'
        }, 
        'totalPages': {
          '$addToSet': {
            'year': '$_id.year', 
            'count': '$pagesCount'
          }
        }, 
        'genres': {
          '$first': '$genres'
        }, 
        'themes': {
          '$first': '$themes'
        }, 
        'paces': {
          '$first': '$paces'
        }
      }
    }, {
      '$unwind': '$genres'
    }, {
      '$unwind': '$genres'
    }, {
      '$group': {
        '_id': {
          'id': '$_id', 
          'genre': '$genres.genre'
        }, 
        'totalBooks': {
          '$first': '$totalBooks'
        }, 
        'totalPages': {
          '$first': '$totalPages'
        }, 
        'genreCount': {
          '$sum': '$genres.count'
        }, 
        'themes': {
          '$first': '$themes'
        }, 
        'paces': {
          '$first': '$paces'
        }
      }
    }, {
      '$group': {
        '_id': '$_id.id', 
        'totalBooks': {
          '$first': '$totalBooks'
        }, 
        'totalPages': {
          '$first': '$totalPages'
        }, 
        'totalGenre': {
          '$addToSet': {
            'genre': '$_id.genre', 
            'count': '$genreCount'
          }
        }, 
        'themes': {
          '$first': '$themes'
        }, 
        'paces': {
          '$first': '$paces'
        }
      }
    }, {
      '$unwind': '$themes'
    }, {
      '$unwind': '$themes'
    }, {
      '$group': {
        '_id': {
          'id': '$_id', 
          'theme': '$themes.theme'
        }, 
        'totalBooks': {
          '$first': '$totalBooks'
        }, 
        'totalPages': {
          '$first': '$totalPages'
        }, 
        'themeCount': {
          '$sum': '$themes.count'
        }, 
        'totalGenre': {
          '$first': '$totalGenre'
        }, 
        'paces': {
          '$first': '$paces'
        }
      }
    }, {
      '$group': {
        '_id': '$_id.id', 
        'totalBooks': {
          '$first': '$totalBooks'
        }, 
        'totalPages': {
          '$first': '$totalPages'
        }, 
        'totalTheme': {
          '$addToSet': {
            'theme': '$_id.theme', 
            'count': '$themeCount'
          }
        }, 
        'totalGenre': {
          '$first': '$totalGenre'
        }, 
        'paces': {
          '$first': '$paces'
        }
      }
    }, {
      '$unwind': '$paces'
    }, {
      '$unwind': '$paces'
    }, {
      '$group': {
        '_id': {
          'id': '$_id', 
          'pace': '$paces.pace'
        }, 
        'totalBooks': {
          '$first': '$totalBooks'
        }, 
        'totalPages': {
          '$first': '$totalPages'
        }, 
        'paceCount': {
          '$sum': '$paces.count'
        }, 
        'totalGenre': {
          '$first': '$totalGenre'
        }, 
        'totalTheme': {
          '$first': '$totalTheme'
        }
      }
    }, {
      '$group': {
        '_id': '$_id.id', 
        'totalBooks': {
          '$first': '$totalBooks'
        }, 
        'totalPages': {
          '$first': '$totalPages'
        }, 
        'totalPace': {
          '$addToSet': {
            'pace': '$_id.pace', 
            'count': '$paceCount'
          }
        }, 
        'totalGenre': {
          '$first': '$totalGenre'
        }, 
        'totalTheme': {
          '$first': '$totalTheme'
        }
      }
    }
  ]