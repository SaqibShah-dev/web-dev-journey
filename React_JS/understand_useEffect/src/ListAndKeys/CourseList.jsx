function CourseList() {
    const courses = [
        {
            id: 1,
            name: "JavaScript",
            topics: ["Variables", "Functions", "Arrays"]
        },
        {
            id: 2,
            name: "React",
            topics: ["Components", "Props", "useState"]
        }
    ];

    return (
        <ul>
            {courses.map(course => (
                <li key={course.id}>
                    <h3>{course.name}</h3>
                    <ul>
                        {course.topics.map(topic => (
                            <li key={topic}>{topic}</li>
                            // key unique within THIS inner list ✅
                        ))}
                    </ul>
                </li>
            ))}
        </ul>
    );
}

export default CourseList;
