package tn.sesame.security;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.SignatureException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.GenericFilterBean;

import org.springframework.web.filter.OncePerRequestFilter;
import tn.sesame.exception.CustomException;

@Component
public class JwtTokenFilter extends OncePerRequestFilter {

  private JwtTokenProvider jwtTokenProvider;

  public JwtTokenFilter(JwtTokenProvider jwtTokenProvider) {
    this.jwtTokenProvider = jwtTokenProvider;
  }

  @Override
  public void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain filterChain)
      throws IOException, ServletException {

    String token = jwtTokenProvider.resolveToken(req);
//      String url = req.getRequestURI();
      if(token!=null) {
          try {
              if (jwtTokenProvider.validateToken(token)) {

                  Authentication auth = token != null ? jwtTokenProvider.getAuthentication(token) : null;
                  SecurityContextHolder.getContext().setAuthentication(auth);
              } else {
//                  res.addHeader("Message", "Invalid token");
//                  res.setStatus(401);
//                  res.sendError(401, "Invalid token");
                  //res.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Authentication Failed");

                  logger.warn("Invalid token");
                  return ;
              }
          } catch (IllegalArgumentException e) {
              logger.error("an error occured during getting username from token", e);
          } catch (ExpiredJwtException e) {
              logger.warn("the token is expired and not valid anymore", e);
          } catch(SignatureException e){
              logger.error("Authentication Failed. Username or Password not valid.");
          }
      }

    filterChain.doFilter(req, res);
  }

}
