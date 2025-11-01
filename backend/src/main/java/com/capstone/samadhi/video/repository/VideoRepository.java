package com.capstone.samadhi.video.repository;

import com.capstone.samadhi.video.entity.Video;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestMapping;

@Repository
public interface VideoRepository extends JpaRepository<Video, Long> {
}
