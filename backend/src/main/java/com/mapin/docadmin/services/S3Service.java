package com.mapin.docadmin.services;

import java.io.IOException;
import java.io.InputStream;
import java.net.URL;

import org.apache.commons.io.FilenameUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;

@Service
public class S3Service {
	
	private static Logger LOG = LoggerFactory.getLogger(S3Service.class);
	
	@Autowired
	private AmazonS3 s3Client;
	
	@Value("${s3.bucket}")
	private String bucketName;
	
	public URL uploadFile(MultipartFile file) {
		try {
			
			String originalName = file.getOriginalFilename();
			@SuppressWarnings("unused")
			String extension = FilenameUtils.getExtension(originalName);
			String fileName = originalName;
			
			InputStream inputStream = file.getInputStream();
			String contentType = file.getContentType();
			return uploadFile(inputStream, fileName, contentType);
			
		} catch (IOException e) {
			throw new IllegalArgumentException(e.getMessage());
		}
	}

	private URL uploadFile(InputStream inputStream, String fileName, String contentType) {
		
		ObjectMetadata meta = new ObjectMetadata();
		meta.setContentType(contentType);
		LOG.info("Início do Upload da imagem..");
		s3Client.putObject(fileName, contentType, inputStream, meta);
		LOG.info("Upload da imagem concluído!");
		return s3Client.getUrl(fileName, bucketName);
	}

}
