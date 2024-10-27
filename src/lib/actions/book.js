export const subStat = (list, genreStat, paceStat, themeStat, pageStat ) => {
    genreStat.forEach(genre => {
        const userGenStat = list.genreRead.find(g => g.genre === genre);
        if (userGenStat) {
            userGenStat.count = userGenStat.count - 1;
            if (userGenStat.count <= 0) {
                userGenStat.count = 0;
            }
        } else {
            list.genreRead.push({ genre, count: 0 });
        }
    })
    themeStat.forEach(theme => {
        const userThemeStat = list.themeRead.find(t => t.theme === theme);
        if (userThemeStat) {
            userThemeStat.count = userThemeStat.count - 1;
            if (userThemeStat.count <= 0) {
                userThemeStat.count = 0;
            }
        } else {
            list.themeRead.push({ theme, count: 0 });
        }
    })
    paceStat.forEach(pace => {
        const userPaceStat = list.paceRead.find(p => p.pace === pace);
        if (userPaceStat) {
            userPaceStat.count = userPaceStat.count - 1;
            if (userPaceStat.count <= 0) {
                userPaceStat.count = 0;
            }
        } else {
            list.paceRead.push({ pace, count: 0 });
        }
    })
    list.pagesRead = (list.pagesRead || 0) - pageStat;
    if (list.pagesRead < 0) {
        list.pagesRead = 0;
    }
    list.booksRead = (list.booksRead || 0) - 1;
    if (list.booksRead <= 0) {
        list.booksRead = 0;
    }
}

export const addStat = (list, genreStat, paceStat, themeStat, pageStat) => {
    genreStat.forEach(genre => {
        const userGenStat = list.genreRead.find(g => g.genre === genre);
        if (userGenStat) {
            userGenStat.count = userGenStat.count + 1;
        } else {
            list.genreRead.push({ genre, count: 1 });
        }
    })
    themeStat.forEach(theme => {
        const userThemeStat = list.themeRead.find(t => t.theme === theme);
        if (userThemeStat) {
            userThemeStat.count = userThemeStat.count + 1;
        } else {
            list.themeRead.push({ theme, count: 1 });
        }
    })
    paceStat.forEach(pace => {
        const userPaceStat = list.paceRead.find(p => p.pace === pace);
        if (userPaceStat) {
            userPaceStat.count = userPaceStat.count + 1;
        } else {
            list.paceRead.push({ pace, count: 1 });
        }
    })
    list.pagesRead = (list.pagesRead || 0) + pageStat;
    list.booksRead = (list.booksRead || 0) + 1;
}