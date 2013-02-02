/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package WebBeans;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.PathParam;
import javax.ws.rs.Consumes;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.GET;
import javax.ws.rs.Produces;
import persistence.administratordata;

/**
 * REST Web Service
 *
 * @author pedro
 */
@Path("aministratorSave")
@Stateless
public class AministratorSaveResource {

    @PersistenceContext(name="WebApplication1PU")
    EntityManager em;
    
    @Context
    private UriInfo context;

    /**
     * Creates a new instance of AministratorSaveResource
     */
    public AministratorSaveResource() {
    }

    /**
     * Retrieves representation of an instance of WebBeans.AministratorSaveResource
     * @return an instance of java.lang.String
     */
    @GET
    @Produces("application/json")
    public String getJson() {
        if(em == null) return "EM NULL";
        administratordata ad = em.find(administratordata.class, new Long(3));
        if(ad == null){
            return "notfound";
        } else{
            return ad.getNotesJSON();
        }
    }

    /**
     * PUT method for updating or creating an instance of AministratorSaveResource
     * @param content representation for the resource
     * @return an HTTP response with content of the updated or created resource.
     */
    @PUT
    @Consumes("application/json")
    public void putJson(String content) {
        if(em == null) return;
        administratordata ad = em.find(administratordata.class, new Long(3));
        if(ad == null){
            ad = new administratordata();
            ad.setId(new Long(3));
            System.out.println("BEFORE PERSIST");
            em.persist(ad);
            System.out.println("CREATED ENTRY");
           // em.find(administratordata, new Long(3));
        }
        ad.setNotesJSON(content);
        em.merge(ad);
    }
}
