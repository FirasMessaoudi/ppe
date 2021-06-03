package tn.sesame.upload;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;

import java.io.*;
import java.net.URLConnection;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


@RestController
@CrossOrigin("*")
@RequestMapping("/api/fileupload")
public class UploadController {
    private static final Logger log = LoggerFactory.getLogger(UploadController.class);

    @Autowired
    StorageService storageService;
    @Autowired
    Environment environment;


    List<String> files = new ArrayList<>();

    @PostMapping("/post")
    public ResponseEntity<String> handleFileUpload(@RequestParam("file") List<MultipartFile> file) {
        String message = "";
        try {
//
            if (!file.isEmpty()) {
                Path root = Paths.get(environment.getProperty("upload.path"));
//                if ((root).toFile().exists()) {
//                    storageService.deleteAll(root);
//                    Files.createDirectory(root);
//
//                } else {
//                    Files.createDirectory(root);
//                }
                for (MultipartFile mf : file) {
                    message = storageService.store(mf, root, mf.getOriginalFilename());
                }
            }
            return ResponseEntity.status(HttpStatus.OK).body(message);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(message);
        }
    }


    @PostMapping(value = "/files/")
    @ResponseBody
    public ResponseEntity<byte[]> getFile(@RequestBody String filename) {
        byte[] b = storageService.readFile(filename);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filename + "\"")
                .body(b);

    }

}
